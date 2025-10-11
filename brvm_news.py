import requests
import pandas as pd
import streamlit as st

st.set_page_config(page_title="📰 Actualités BRVM", layout="centered")
st.title("📰 Actualités du marché BRVM")

# 🔄 Appel à ton API Render
API_URL = "https://brvm-api.onrender.com/api/news"

try:
    response = requests.get(API_URL, timeout=5)
    response.raise_for_status()
    data = response.json()
    df = pd.DataFrame(data)

    if df.empty:
        st.warning("⚠️ Aucune actualité disponible.")
    else:
        df["date"] = pd.to_datetime(df["date"]).dt.date
        st.dataframe(df)

        # 📥 Bouton d’export CSV
        st.download_button(
            label="📥 Exporter les actualités en CSV",
            data=df.to_csv(index=False).encode('utf-8'),
            file_name="actualites_brvm.csv",
            mime="text/csv"
        )

except requests.exceptions.RequestException as e:
    st.error(f"❌ Erreur lors de la récupération des actualités : {e}")


 