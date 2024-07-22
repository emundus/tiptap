const createPm2App = (name) => {
    return {
        name,
        script: 'npm',
        args: "start",
        exec_mode: 'fork',
        node_args: "--max-old-space-size=2048",
        kill_timeout: 30000
    }
}

const apps = [
    createPm2App('poq-editor'),
]

module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps,

    /**
     * Deployment section
     * http://pm2.keymetrics.io/docs/usage/deployment/
     *
     * @WARNING: as of pm 2.10.3, no StrictHostKeyChecking does not work.
     * You should set manually StrictHostKeyChecking in .ssh/config
     */
    deploy: {
        dev: {
            user: 'ubuntu',
            host: '37.187.50.71',
            key: '~/.ssh/dev',
            ref: 'origin/dev',
            ssh_options: [
                'ForwardAgent=yes',
                'StrictHostKeyChecking=no',
                'PasswordAuthentication=no'
            ],
            repo: 'git@bitbucket.org:wiinorganizers/poq-editor.git',
            fetch: 'fast',
            path: '/home/ubuntu/poq-editor',
            'pre-deploy' : 'git checkout .',
            'post-deploy': "pm2 delete poq-editor && npm install && npm run build && cd dist && pm2 serve . 8000 --name poq-editor && pm2 save"
        }
    }
}
