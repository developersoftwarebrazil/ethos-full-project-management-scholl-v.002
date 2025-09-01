from django.shortcuts import render, redirect
from django.contrib.auth import login
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import get_user_model
from .forms import CustomUserCreationForm, SuperUserCreationForm, SupervisorCreationForm, TeacherCreationForm

User = get_user_model()  # pega o User definido no AUTH_USER_MODEL


def home(request):
    return render(request, 'home.html')


def login_view(request):
    form = AuthenticationForm(request, data=request.POST or None)

    if request.method == 'POST' and form.is_valid():
        user = form.get_user()
        login(request, user)
        return redirect('/')  # ajuste para o dashboard ou página inicial

    return render(request, 'login.html', {'form': form})


def register_user(request):
    if request.method == "POST":
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect("/")  # ou dashboard
    else:
        form = CustomUserCreationForm()
    return render(request, "register_user.html", {"form": form})


def register_superuser(request):
    if request.method == "POST":
        form = SuperUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_staff = True
            user.is_superuser = True
            user.role = "admin"   # 👈 garante a role correta no modelo customizado
            user.save()
            login(request, user)
            return redirect("/admin/")
    else:
        form = SuperUserCreationForm()
    return render(request, "register_superuser.html", {"form": form})

def register_teacher(request):
    if request.method == "POST":
        form = TeacherCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect("/")
    else:
        form = TeacherCreationForm()
    return render(request, "register_teacher.html", {"form": form})


def register_supervisor(request):
    if request.method == "POST":
        form = SupervisorCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect("/")
    else:
        form = SupervisorCreationForm()
    return render(request, "register_supervisor.html", {"form": form})
