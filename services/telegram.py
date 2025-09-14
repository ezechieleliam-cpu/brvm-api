import requests

def send_telegram_alert(message: str):
    token = "TON_BOT_TOKEN"
    chat_id = "TON_CHAT_ID"
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = {"chat_id": chat_id, "text": message}
    requests.post(url, data=payload)
