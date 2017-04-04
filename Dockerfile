# Base image
FROM your/image/path

# Switch to unprivileged user
USER username

# Workdir is unprivileged user home
WORKDIR /www/kitty

# TCP port application listens on.
EXPOSE 3030

# Entry point
CMD ["node", "./bin/www"]
