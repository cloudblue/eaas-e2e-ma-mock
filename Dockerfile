FROM cloudblueconnect/connect-extension-runner:28.4

RUN apt-get update && apt-get install sqlite3 -y
COPY pyproject.toml /install_temp/.
COPY poetry.* /install_temp/.
WORKDIR /install_temp
RUN poetry update && poetry install --no-root
COPY package*.json /install_temp/.
RUN if [ -f "/install_temp/package.json" ]; then npm install; fi

