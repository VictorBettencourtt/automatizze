# ─────────────────────────────────────────────
# Dockerfile — Site Institucional Automatizze.ia
# Usa nginx:alpine para servir arquivos estáticos
# ─────────────────────────────────────────────

FROM nginx:alpine

# Remove config padrão do nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia nossa config customizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia todos os arquivos do site para o diretório do nginx
COPY . /usr/share/nginx/html/

# Remove o Dockerfile e nginx.conf do diretório público (boas práticas)
RUN rm -f /usr/share/nginx/html/Dockerfile \
          /usr/share/nginx/html/nginx.conf \
          /usr/share/nginx/html/.gitignore

# Expõe a porta 80
EXPOSE 80

# Healthcheck para EasyPanel
HEALTHCHECK --interval=30s --timeout=3s CMD wget -q --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
