<?php
namespace app;
/**
 * Created by PhpStorm.
 * User: yangjian
 * Date: 2017/9/29
 * Time: 22:49
 */
use Workerman\Protocols\Websocket;
use Workerman\Worker;
require_once __DIR__ . '/vendor/autoload.php';

$ws = new Worker('websocket://0.0.0.0:50001');
//$ws->onConnect = function($connection)
//{
//    $connection->send("connected.");
//    $connection->onWebSocketConnect = function($connection , $http_header)
//    {
//        $connection->websocketType = Websocket::BINARY_TYPE_ARRAYBUFFER;
//    };
//};

$ws->onMessage = function($connection, $data)
{
    // 这部分运行在子进程
    $connection->send($data);
};

// 运行worker
Worker::runAll();