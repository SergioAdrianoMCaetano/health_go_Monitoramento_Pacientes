import pandas as pd
import os

def process_csv_file(file_path: str) -> pd.DataFrame:
    df = pd.read_csv(file_path)
    
    print("🔍 Colunas no CSV:", df.columns.tolist())
    
    column_mapping = {
        'timestamp': 'timestamp',
        'paciente_id': 'patient_id',
        'paciente_nome': 'patient_name',
        'paciente_cpf': 'patient_cpf',
        'hr': 'heart_rate',
        'spo2': 'spo2',
        'pressao_sys': 'bp_sys',
        'pressao_dia': 'bp_dia',
        'temp': 'temperature',
        'resp_freq': 'resp_rate',
        'status': 'status'
    }
    
    # Aplicar apenas mapeamentos para colunas que existem
    existing_columns = {k: v for k, v in column_mapping.items() if k in df.columns}
    df.rename(columns=existing_columns, inplace=True)
    
    df["source_file"] = os.path.basename(file_path)
    
    print("✅ Colunas após mapeamento:", df.columns.tolist())
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
            print(f"❌ Erro ao processar {file}: {e}")

    if not dfs:
        raise ValueError("Nenhum arquivo CSV válido encontrado.")

    combined_df = pd.concat(dfs, ignore_index=True)
    return combined_df