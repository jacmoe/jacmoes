<?php
/* (c) Jacob Moen <jacmoe.dk@gmail.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/
namespace Deployer;

require_once __DIR__ . '/common.php';

task('local-config', function () {

    echo get('repository') . "\n";

    if(askConfirmation("Local configuration.\n\nThis will overwrite any existing file without further warning!\n\nAre you sure you want to continue?")) {
        /**
        * Paser value for template compiler
        *
        * @param array $matches
        * @return string
        */
        $paser = function($matches) {
            if (isset($matches[1])) {
                if($matches[1] === 'release_path') {
                    echo "Got a release_path\n";
                    $matches[1] = 'deploy_path';
                }
                echo "about to get value " . $matches[1] . "\n";
                $value = get($matches[1]);
                echo "Got value: " . $value . "\n";
                if (is_null($value) || is_bool($value) || is_array($value)) {
                    $value = var_export($value, true);
                }
            } else {
                $value = $matches[0];
            }
            return $value;
        };

        /**
        * Template compiler
        *
        * @param string $contents
        * @return string
        */
        $compiler = function ($contents) use ($paser) {
            echo "I am in compiler\n";
            $contents = preg_replace_callback('/\{\{\s*([\w\.]+)\s*\}\}/', $paser, $contents);

            echo "Contents: " . $contents;

            return $contents;
        };

        $finder   = new \Symfony\Component\Finder\Finder();
        $iterator = $finder
        ->ignoreDotFiles(false)
        ->files()
        ->name('/\.tpl$/')
        ->in(getcwd() . '/deployer/templates');

        $tmpDir = sys_get_temp_dir();
        $releaseDir = get('deploy_path');

        echo "About to loop over files found...\n";
        /* @var $file \Symfony\Component\Finder\SplFileInfo */
        foreach ($iterator as $file) {
            echo "File : " . $file . "\n";
            $success = false;
            // Make tmp file
            $tmpFile = tempnam($tmpDir, 'tmp');
            echo $tmpFile . "\n";
            if (!empty($tmpFile)) {
                echo "tmpFile is not empty\n";
                try {
                    $contents = $compiler($file->getContents());
                    echo "compiler got content\n";

                    // cookie validation key
                    if(basename($file) === 'web.php.tpl') {
                        $length = 32;
                        $bytes = openssl_random_pseudo_bytes($length);
                        $key = strtr(substr(base64_encode($bytes), 0, $length), '+/=', '_-.');
                        $contents = preg_replace('/(("|\')cookieValidationKey("|\')\s*=>\s*)(""|\'\')/', "\\1'$key'", $contents);
                    }

                    $target   = preg_replace('/\.tpl$/', '', $file->getRelativePathname());
                    echo "Target : " . $target . "\n";
                    // Put contents and upload tmp file to server
                    if (file_put_contents($tmpFile, $contents) > 0) {
                        if(basename($file) === 'yii.tpl') {
                            upload($tmpFile, "$releaseDir/" . $target);
                            run('chmod +x ' . "$releaseDir/" . $target);
                        } else {
                            run("mkdir -p $releaseDir/" . dirname($target));
                            upload($tmpFile, "$releaseDir/" . $target);
                        }
                        $success = true;
                    }
                } catch (\Exception $e) {
                    $success = false;
                }
                // Delete tmp file
                unlink($tmpFile);
            }
            if ($success) {
                writeln(sprintf("<info>✔</info> %s", $file->getRelativePathname()));
            } else {
                writeln(sprintf("<fg=red>✘</fg=red> %s", $file->getRelativePathname()));
            }
        }

    }
})->desc('Configures your local development environment')->onStage('local');
