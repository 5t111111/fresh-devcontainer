FROM denoland/deno:2.0.0-rc.10

# In the case of Linux, the UID and GID of the deno user are set to be the same as those of the host user, which can sometimes cause permission errors when writing to /deno-dir.
# To avoid this, set the DENO_DIR to a path within the home directory.
ENV DENO_DIR /home/deno/deno-dir

USER deno
