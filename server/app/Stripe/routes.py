import json

from fastapi import Request, APIRouter, HTTPException, Response
from dotenv import load_dotenv
import os

import stripe

from app.Users.models import User
from database import SessionLocal
from app.middleware.auth import get_current_user
from app.Users.routes import crearTokenJWT
load_dotenv()
routerStripe=APIRouter()
stripe.api_key=os.getenv("STRIPE_SECRET_KEY")

@routerStripe.post("/stripe/pago_suscripcion")
async def pagarSuscripcion(request: Request):
    sessionId=get_current_user(request=request)
    if isinstance(sessionId, dict):
        session = stripe.checkout.Session.create(
            success_url="http://localhost:5173/",
            cancel_url="http://localhost:5173/",
            line_items= [{"price": "price_1TUKbH8qFgrgXiMd5LThPceg", "quantity": 1}],#prod_UTH9d38nVVNDG3
            mode= "subscription",
            customer_email=sessionId["email"],
            metadata={
                "email":sessionId["email"],
                "usuario":sessionId["usuario"],
                "is_premium":sessionId["is_premium"],
            }
        )
        return {"session":session}
    else:
        return {"success":False}
   
endpoint_secret = os.getenv("STRIPE_WEBHOOK_SECRET")

@routerStripe.post("/webhook")
async def webhook(request: Request,response:Response):
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
        #print("Event:",event)
    except stripe.error.SignatureVerificationError: # type: ignore
        raise HTTPException(status_code=400, detail="Firma inválida")
    print(event["type"])
    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        customer_user = session["metadata"]["usuario"]
        customer_email = session["metadata"]["email"]
        db= SessionLocal()
        db.begin()
        db_user = db.query(User).filter(User.email == customer_email).first()
        if db_user:
            db_user.is_premium = True # type: ignore
            db.commit()
            db.close()
           

    return {"success": True}
#reform-solid-shine-fame
