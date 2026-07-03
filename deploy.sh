docker stop erp-next
docker rm erp-next
docker rmi erp-next-image

docker build -t erp-next-image .
docker run -d -p 3000:3000 --name erp-next --net erp-net erp-next-image