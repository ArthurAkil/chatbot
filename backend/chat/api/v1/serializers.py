from rest_framework import serializers
from rest_framework.exceptions import PermissionDenied

from django.contrib.auth.models import User
from chat.models import Conversa, Mensagem


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields =["id", "username"]

class MensagemSerializer(serializers.ModelSerializer):
    enviado_por = UsuarioSerializer(read_only=True)
    conversa = serializers.PrimaryKeyRelatedField(queryset=Conversa.objects.all())
    imagem_url = serializers.SerializerMethodField()
    tipo = serializers.SerializerMethodField()
    
    class Meta:
        model = Mensagem
        fields = ['id', 'conversa', 'enviado_por', 'conteudo', 'imagem', 'imagem_url', 'data_envio','bot', 'tipo']
        read_only_fields = ["id","enviado_por", "data_envio", "bot", "tipo"]

    def create(self, validated_data):
        request = self.context.get("request")
        user = request.user
        conversa = validated_data["conversa"]

        if conversa.usuario != user and not user.is_staff:
            raise PermissionDenied("Você não tem acesso a esta conversa.")
        
        mensagem = Mensagem.objects.create(
            enviado_por=user,
            bot=False,
            **validated_data
        )

        # msg automatica
        total = conversa.mensagens.count()
        if total == 1:
            Mensagem.objects.create(
                conversa=conversa,
                enviado_por=user,
                conteudo=f"Obrigado por entrar em contato {user.username}, já já retornaremos!",
                bot=True
            )
        return mensagem
    
    def get_tipo(self, obj):
        user = self.context['request'].user
        if obj.bot:
            return "bot"
        elif obj.enviado_por == user:
            return "meu_usuario"
        else:
            return "outro_usuario"

    def get_imagem_url(self, obj):
        # transformar a url fornecida pelo DRF como um link pronto para o front consumir
        request = self.context.get("request")
        if obj.imagem:
            if request is not None: 
                return request.build_absolute_uri(obj.imagem.url) # retorna a url já pronta
            return obj.imagem.url # envia o caminho relativo
        return None #não houve imagem retorna nada
    

class ConversaSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer(read_only=True)
    mensagens = MensagemSerializer(many=True, read_only=True)

    class Meta: 
        model = Conversa
        fields = ['id', 'usuario', 'titulo', 'fechada', 'criada_em', 'mensagens']
        read_only_fields = ["id", "usuario", "criada_em", "mensagens"]
