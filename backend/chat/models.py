from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Conversa(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    titulo = models.CharField(max_length=100, blank=True)
    fechada = models.BooleanField(default=False)
    criada_em = models.DateTimeField(auto_now_add=True)

    class Meta: 
        verbose_name = "Conversa"
        verbose_name_plural = "Conversas"

    def __str__(self):
        return f"Conversa: {self.id} - Título: {self.titulo}"
    
class Mensagem(models.Model):
    conversa = models.ForeignKey(Conversa, on_delete=models.CASCADE, related_name="mensagens") #rn - pegar todas as msgs da conversa
    enviado_por = models.ForeignKey(User, on_delete=models.CASCADE)
    conteudo = models.TextField(blank=True)
    imagem = models.ImageField(upload_to="chat/imagens/", blank=True, null=True)
    data_envio = models.DateTimeField(auto_now_add=True)
    bot = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Mensagem"
        verbose_name_plural = "Mensagens"

    def __str__(self):
        return f"Mensagem de {self.enviado_por.username} na conversa {self.conversa.id}"
    