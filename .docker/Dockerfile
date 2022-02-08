FROM alpine:3.15.0

RUN apk add --no-cache supervisor nginx nodejs && mkdir -p /usr/local/bin/api
RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log

COPY .docker/etc/supervisord.conf /etc/supervisord.conf
COPY .docker/etc/nginx/http.d/default.conf /etc/nginx/http.d/default.conf
COPY dist/api /usr/local/bin/api
COPY dist/www /usr/share/nginx/html

EXPOSE 80

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
