import subprocess
import os
import logging

# Example of log: [2026-07-31T06-21-44]: Helmfile configuration applied successfully
logging.basicConfig(
    level=logging.INFO,
    format="[%(asctime)s]: %(message)s",
    datefmt="%Y-%m-%dT%H-%M-%S",
)

def run(cmd):
    # Popen is used to read command output line by line. We used `subprocess.run`, which doesn't allow to print logs line by line
    process = subprocess.Popen(
        cmd,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True
    )

    for line in process.stdout:
        # rstrip() removes spaces and line break characters. Without this step there might be a situation when end of line contains `\n` or `\r` symbols
        logging.info(line.rstrip())

    # Handling error termination. Without this step command will be recognized as successfull even if it finished with an error. 
    if process.wait() != 0:
        raise subprocess.CalledProcessError(process.wait(), cmd)


if (os.getenv("SYNCHRONIZER_ENABLED") == "true"):
    logging.info(f'Cloning repository {os.getenv("ENV_REPOSITORY")}')
    run(["git", "clone", f'https://github.com/{os.getenv("ENV_REPOSITORY")}.git', "--progress"])
    logging.info(f'Repository {os.getenv("ENV_REPOSITORY")} cloned successfully')

    logging.info('Cleaning up helmfile cache')
    run(['helmfile', 'cache', 'cleanup'])
    logging.info('Helmfile cache cleaned')

    logging.info('Applying new configuration')
    # The --concurrency 1 flag was used to process only one service at a time, thereby consuming fewer resources.
    run(['helmfile', '--environment', f'{os.getenv("NAMESPACE")}', '--namespace', f'{os.getenv("NAMESPACE")}', '-f', f'{os.getenv("PATH_TO_HELMFILE")}', 'apply', '--concurrency', '1'])
    logging.info('Helmfile configuration applied successfully')

else:
    logging.info('SYNCHRONIZER IS DISABLED')