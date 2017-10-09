<?php
namespace app;
/**
 * Created by PhpStorm.
 * User: yangjian
 * Date: 2017/9/29
 * Time: 22:49
 */
use Workerman\Worker;
require_once __DIR__ . '/vendor/autoload.php';

$ws = new Worker('websocket://0.0.0.0:50001');
$GLOBALS['clients'] = array();
$ws->onConnect = function($connection)
{
    $connection->send("connected.");
    $connection->onWebSocketConnect = function($connection)
    {
        array_push($GLOBALS['clients'], $connection);
    };

    //广播消息
    $connection->onMessage = function($connection, $data)
    {
        foreach($GLOBALS['clients'] as $value) {
            $value->send($data);
        }
    };

};



// 运行worker
Worker::runAll();