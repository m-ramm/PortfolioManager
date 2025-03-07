# PortfolioManager
## Deployment
Deployed at xxxxxxxxx

## Personal Machine Set-up
To source the data, can use yfinance library or TIINGO. I would recommend yfinance, does not require API key and does not explicitly limit free usage

- Clone repo
- Set up and activate virtual environment - ([venv setup](https://docs.python.org/3/library/venv.html))
- Install python dependencies from requirements.txt (pip install -r requirements.txt)
- Install PostgresSQL and initialise account information ([postgresql download](https://www.postgresql.org/download/))
- Create new database with name of your choosing
- Create TIINGO account (if applicable) and retrieve API key - ([TIINGO](https://www.tiingo.com/))
- [ Optional ] Retrieve up to date CSV/EXCEL file for supported tickers, put in ingestion directory. Current is only relevant to June 2023 - ([Market Index](https://www.marketindex.com.au/data-downloads))
- Add database credentials/info and TIINGO api key (if applicable) to .env
- Run all on ingestion.ipynb notebook
- Enter django project directory and run 'python manage.py runserver'
- Enter React project directory and run 'npm install' then 'npm run dev'