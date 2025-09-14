import streamlit as st
import requests

st.set_page_config(page_title="BRVM Mobile", layout="wide")

st.title("📊 BRVM Mobile Dashboard")

stats = requests.get("https://brvm-api-1.onrender.com/stats").json()
st.metric("Total Actions", stats["total_actions"])
st.metric("Hausses", stats["actions_en_hausse"])
st.metric("Baisses", stats["actions_en_baisse"])
st.metric("Variation Moyenne", f"{stats['variation_moyenne']}%")

top = requests.get("https://brvm-api-1.onrender.com/top-mouvements").json()
st.subheader("📈 Top Hausses")
for action in top["hausses"]:
    st.write(f"{action['symbole']} : +{action['variation']}%")

st.subheader("📉 Top Baisses")
for action in top["baisses"]:
    st.write(f"{action['symbole']} : {action['variation']}%")
