import pandas as pd
import streamlit as st
import requests

st.set_page_config(page_title="📰 Actualités BRVM", layout="centered")
st.title("📰 Actualités du marché BRVM")

try:
    response = requests.get("http://localhost:3000/api/news", timeout=5)
    response.raise_for_status()
    data = response.json()
    df = pd.DataFrame(data)

    if df.empty:
        st.warning("⚠️ Aucune actualité disponible.")
    else:
        df["date"] = pd.to_datetime(df["date"]).dt.date
        st.dataframe(df)

        st.download_button(
            label="📥 Exporter les actualités en CSV",
            data=df.to_csv(index=False).encode('utf-8'),
            file_name="actualites_brvm.csv",
            mime="text/csv"
        )

except requests.exceptions.RequestException as e:
    st.error(f"❌ Erreur API : {e}")
