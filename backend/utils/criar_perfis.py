from django.contrib.auth.models import User

if not User.objects.filter(username="UsuarioTeste").exists():
    User.objects.create_user(username="UsuarioTeste", password="userpassword123")

if not User.objects.filter(username="admin").exists():
    User.objects.create_superuser(username="admin", password="admin")

print("Usuários criados com sucesso.")