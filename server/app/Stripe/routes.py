from fastapi import Request

from main import app
from stripe import StripeClient
from dotenv import load_dotenv
import os
load_dotenv()
@app.post("/stripe/pagar_suscripcion")
async def pagarSuscripcion(request: Request):
    clave=os.getenv("STRIPE_SECRET_KEY")
    if(clave is None): return
    client = StripeClient(clave)
    session = client.v1.checkout.sessions.create({
        "success_url": "https://example.com/success",
        "line_items": [{"price": "{{PRICE_ID}}", "quantity": 2}],
        "mode": "payment",
    })
