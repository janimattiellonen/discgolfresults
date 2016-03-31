<?php
require_once __DIR__.'/../vendor/autoload.php';

$app = new Silex\Application();
$app['debug'] = true;

$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__  ,
));

$app->register(new Silex\Provider\DoctrineServiceProvider(), [
    'db.options' => [
        'driver' => 'pdo_mysql',
        'user' => 'root',
        'password' => '',
        'host' => 'localhost',
        'dbname' => 'discgolfscoresfinalresults'
    ],
]);

$app->get('/', function() use($app) {
    return $app['twig']->render('index.html');
    //return $app['twig']->render('index.html.twig');
});

$app->get('/api/scores', function() use($app) {

    $sql = "SELECT * FROM lk_score";
    $post = $app['db']->fetchAll($sql);

    return $app->json($post);
});

$app->run();

