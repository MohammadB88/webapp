FROM golang:alpine AS build-env
RUN mkdir /go/src/app && apk update && apk add git
ADD main.go config.json go.mod go.sum /go/src/app/
WORKDIR /go/src/app

RUN go mod download && CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags '-extldflags "-static"' -o /go/src/app/app .

FROM scratch
WORKDIR /app
COPY --from=build-env /go/src/app/app .
COPY --from=build-env /go/src/app/config.json .
ENTRYPOINT [ "./app" ]
