#server {
#	listen 80 default_server;
#	server_name llavemano.atm.etecsa.cu www.llavemano.atm.etecsa.cu;
#   return 301 https://$server_name$request_uri;
#}
server {

	listen 80 default_server;
	
	# SSL configuration	
#	listen 443 ssl;
	#include snippets/self-signed.conf;
	#include snippets/ssl-params.conf;

	server_name llavemano.dvls.etecsa.cu www.llavemano.dvls.etecsa.cu;
#	server_name 192.168.133.105 192.168.133.105;
#	root /var/www/llavemano.dvls.etecsa.cu/html;
	root /var/www/base.dvls.etecsa.cu/notus-angular;
	index index.html;

	location / {
		# cache
		
		expires -1;
		add_header Pragma "no-cache";
		add_header Cache-Control "no-store, no-cache, must-revalidate, post-check=0, pre-check=0";		
		
		# angular routing rewrite
		try_files $uri$args $uri$args/ $uri $uri/ /index.html =404;
		
	}
	
	location /api {   
		proxy_pass http://llavemano.dvls.etecsa.cu:3000/api;
#		proxy_pass http://192.168.133.105:3000/api;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection 'upgrade';
		proxy_set_header Host $host;
		proxy_cache_bypass $http_upgrade;
	}

}
