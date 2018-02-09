Nutrifami
=======================

Aplicación Web responsive para nutrifami.

Una vez descargados los archivos se debe configurar el servidor virtual.

Installation
----------------------------------

1. Install NodeJs
2. In the root of the project run 
        npm install
3. Install bower:
        npm install -g bower
4. Install dependencies:
        bower install
5. Run server:
        gulp


VirtualHost Example: 
--------------
    <VirtualHost *:80>
        ServerName nutrifami.org
        ServerAlias www.nutrifami.org
        DocumentRoot "/Users/fats2005/Documents/proyectos/nf2/nfweb/public"
        <Directory "/Users/fats2005/Documents/proyectos/nf2/nfweb/public">
            ServerSignature Off
            Options Indexes FollowSymLinks
            AllowOverride All
            Require all granted
        </Directory>
        ErrorLog "/private/var/log/apache2/nutrifami-error_log"
        CustomLog "/private/var/log/apache2/nutrifami-access_log" common
    </VirtualHost>


