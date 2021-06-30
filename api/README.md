# stxstats API

This service is responsible of generating the data used by the client. It expose this data via the http protocol on port 4000.

### Known issues

- can't upgrade prisma to latest version - blocked by https://github.com/prisma/prisma/issues/7097
- can't use node 16 (currently using node 14) - blocked by prisma upgrade
