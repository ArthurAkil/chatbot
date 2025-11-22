from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Conversa, Mensagem

@admin.register(Conversa)
class ConversaAdmin(admin.ModelAdmin):
    list_display = ('id', 'titulo', 'usuario', 'fechada', 'criada_em')
    list_filter = ('fechada', 'criada_em')
    search_fields = ('titulo', 'usuario__username')

@admin.register(Mensagem)
class MensagemAdmin(admin.ModelAdmin):
    list_display = ('id', 'conversa', 'enviado_por', 'bot', 'data_envio')
    list_filter = ('bot', 'data_envio')
    search_fields = ('conteudo', 'enviado_por__username')