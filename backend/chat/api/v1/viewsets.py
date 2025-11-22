from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied

from chat.models import Mensagem, Conversa
from chat.api.v1.serializers import ConversaSerializer, MensagemSerializer

class ConversaViewSet(viewsets.ModelViewSet):
    serializer_class = ConversaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Conversa.objects.filter(usuario=self.request.user)
        # quero retornar as conversas do usuário logado

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)
        # seta o usuario

class MensagemViewSet(viewsets.ModelViewSet):
    serializer_class = MensagemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Mensagem.objects.filter(conversa__usuario=self.request.user).order_by("data_envio")
    
    def perform_create(self, serializer):
        serializer.save()
    


