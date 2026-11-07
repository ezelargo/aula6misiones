<?php
// Respaldo del web.config: misma logica de redirecciones, hecha en PHP.

$dominio = 'aula6misiones.com.ar';
$googleDoc = 'https://docs.google.com/document/d/1lhFKivX0y5_yqZ9_5j4KnIJVhsmM8H_BXOlijv6CZRg/edit?tab=t.0#heading=h.ym7osoeah8hf';

$host = strtolower($_SERVER['HTTP_HOST'] ?? '');
$esHttps = (!empty($_SERVER['HTTPS']) && strtolower($_SERVER['HTTPS']) !== 'off')
    || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https')
    || (($_SERVER['SERVER_PORT'] ?? '') == 443);

// 1) Dominio canonico: https y sin www (301 permanente)
if (!$esHttps || strpos($host, 'www.') === 0) {
    $uri = $_SERVER['REQUEST_URI'] ?? '/';
    header('Location: https://' . $dominio . $uri, true, 301);
    exit;
}

// 2) Raiz -> Google Doc (302 temporal)
header('Location: ' . $googleDoc, true, 302);
exit;
