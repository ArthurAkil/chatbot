from rest_framework.routers import DefaultRouter

from chat.api.v1.viewsets import ConversaViewSet, MensagemViewSet

router = DefaultRouter()
router.register(r'conversas', ConversaViewSet, basename='conversa')
router.register(r'mensagens', MensagemViewSet, basename='mensagem')

urlpatterns = router.urls