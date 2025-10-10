import pandas as pd
import streamlit as st
import requests

response = requests.get("http://localhost:3000/api/brvm")
print(response.status_code)
print(response.json())

data = requests.get("http://localhost:3000/api/brvm").json()
df = pd.DataFrame(data)

st.download_button("📥 Exporter BRVM CSV", df.to_csv(index=False), "brvm.csv", "text/csv")