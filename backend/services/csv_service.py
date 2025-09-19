import pandas as pd
import os

def process_csv_file(file_path: str) -> pd.DataFrame:
    df = pd.read_csv(file_path)
    df["source_file"] = os.path.basename(file_path)
    return df

def combine_all_csvs(folder: str = "data") -> pd.DataFrame:
    all_files = [f for f in os.listdir(folder) if f.endswith(".csv")]
    dfs = []

    for file in all_files:
        path = os.path.join(folder, file)
        try:
            df = process_csv_file(path)
            dfs.append(df)
        except Exception as e:
            print(f"Erro ao processar {file}: {e}")

    if not dfs:
        raise ValueError("Nenhum arquivo CSV válido encontrado.")

    combined_df = pd.concat(dfs, ignore_index=True)
    return combined_df

