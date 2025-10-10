import streamlit as st
import requests

st.set_page_config(page_title="Actualités BRVM", layout="wide")

st.title("📰 Actualités BRVM")

try:
    response = requests.get("http://localhost:3000/api/news")
    news = response.json()

    if not news:
        st.warning("Aucune actualité disponible.")
    else:
        for item in news:
            st.markdown(f"### {item['title']}")
            st.write(item['html'], unsafe_allow_html=True)

except Exception as e:
    st.error(f"Erreur lors de la récupération des actualités : {e}")
