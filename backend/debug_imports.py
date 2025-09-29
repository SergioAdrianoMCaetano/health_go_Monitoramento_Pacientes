import sys
import os
print("🐍 Python path:")
for path in sys.path:
    print(f"  {path}")

print("\n📁 Current directory:", os.getcwd())
print("📁 App directory:", os.path.dirname(os.path.abspath(__file__)))

try:
    from app.services.csv_service import combine_all_csvs
    print("✅ Import funcionando!")
except ImportError as e:
    print(f"❌ Erro de import: {e}")