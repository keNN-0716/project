from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, 'home.html')

def secret(request):
    return render(request, 'secret.html')