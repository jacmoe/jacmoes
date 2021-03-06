<?php

$params = require(__DIR__ . '/params.php');
$snippets = require(__DIR__ . '/snippets.php');

return [
    'id' => 'pype-console',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'controllerNamespace' => 'app\commands',
    'components' => [
        'cache' => [
            'class' => 'yii\caching\FileCache',
        ],
        'log' => [
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
    ],
    'modules' => [
      'mdpages' => [
        'class' => 'jacmoe\mdpages\Module',
        'repository_url' => 'https://github.com/{{github_owner}}/{{github_repo}}.git',
        'github_token' => '{{github_token}}',
        'github_owner' => '{{github_owner}}',
        'github_repo' => '{{github_repo}}',
        'github_branch' => '{{github_branch}}',
        'absolute_wikilinks' => true,
        'generate_page_toc' => true,
        'generate_contributor_data' => false,
        'snippets' => $snippets,
      ],
    ],
    'params' => $params,
];
