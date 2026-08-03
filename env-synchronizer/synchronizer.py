import subprocess
import os
import logging

def run(cmd):
    # Popen is used to read command output line by line
    process = subprocess.Popen(
        cmd,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True
    )

    for line in process.stdout:
        # rstrip() removes spaces and line break characters
        logging.info(line.rstrip())

    # handling error termination
    if process.wait() != 0:
        raise subprocess.CalledProcessError(process.wait(), cmd)

# Example of log: [2026-07-31T06-21-44]: Helmfile configuration applied successfully
logging.basicConfig(
    level=logging.INFO,
    format="[%(asctime)s]: %(message)s",
    datefmt="%Y-%m-%dT%H-%M-%S",
)


if (os.getenv("SYNCHRONIZER_ENABLED") == "true"):
    logging.info(f'Cloning repository {os.getenv("ENV_REPOSITORY")}')
    run(["git", "clone", f'https://github.com/{os.getenv("ENV_REPOSITORY")}.git', "--progress"])
    logging.info(f'Repository {os.getenv("ENV_REPOSITORY")} cloned successfully')

    logging.info('Cleaning up helmfile cache')
    run(['helmfile', 'cache', 'cleanup'])
    logging.info('Helmfile cache cleaned')

    logging.info('Applying new configuration')
    run(['helmfile', '--environment', f'{os.getenv("NAMESPACE")}', '--namespace', f'{os.getenv("NAMESPACE")}', '-f', f'{os.getenv("PATH_TO_HELMFILE")}', 'apply', '--concurrency', '1'])
    logging.info('Helmfile configuration applied successfully')

else:
    logging.info('SYNCHRONIZER IS DISABLED')