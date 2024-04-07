import requests
from bs4 import BeautifulSoup
from datetime import datetime
import django
import os
import sys
import re
from decimal import Decimal

# Configure o ambiente do Django
os.chdir("D:/Prog/e-commerce-api/")
sys.path.append("D:/Prog/e-commerce-api/")  # Altere para o caminho correto do seu projeto
os.environ["DJANGO_SETTINGS_MODULE"] = 'backend.settings'
django.setup()

from main.models import *

# URL da página da web a ser raspada
url = "https://www.usealphaco.com.br/kits/"

# Fazendo a requisição HTTP para a página
response = requests.get(url)
print(response)

def extrair_decimal(texto):
    # Usando expressão regular para encontrar os dígitos antes e depois do ponto decimal
    match = re.search(r'(\d+,\d+)|(\d+)', texto)
    if match:
        # Obtendo o número correspondente
        numero_str = match.group(0).replace(',', '.')  # Substituindo ',' por '.' para representar corretamente o decimal
        # Convertendo a string de número em um valor decimal
        valor_decimal = Decimal(numero_str)
        return valor_decimal
    return None

soup = BeautifulSoup(response.content, 'html.parser')
categoria, created = ProductCategory.objects.get_or_create(
    title='Vestuário',
    defaults={'detail': 'Categoria padrão para vestuário'}
)
condicao, created = ProductCondition.objects.get_or_create(
    condition='new',
    defaults={'condition': 'Novo'}
)
# Encontrar todas as divs com a classe categoria-produtos
categoria_produtos_divs = soup.find('div', class_='categoria-produtos')
if categoria_produtos_divs:
    cardprod_divs = categoria_produtos_divs.find_all('div', class_='cardprod')
    for produto in cardprod_divs:
        nome = produto.find('a' ,class_="cardprod-nomeProduto").text.strip()
        print('achou nome - ',nome)
        preco=produto.find('span',class_="cardprod-valor").text.strip()
        preco_decimal = extrair_decimal(preco)
        print(preco_decimal)
        
        new_prod = Product(
            title=nome,
            price=preco_decimal,
            category=categoria,
            condition=condicao,
            detail='',

        )
        #new_prod.save()