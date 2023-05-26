# 使用Nginx镜像作为基础镜像
FROM nginx

# 删除默认Nginx配置文件
RUN rm /etc/nginx/conf.d/default.conf

# 将Vue项目的生产版本复制到Nginx的默认网页目录
COPY ./app /usr/share/nginx/html

# 复制自定义Nginx配置文件（如果有）
COPY nginx.conf /etc/nginx/nginx.conf

# 暴露Nginx的默认HTTP端口（可选）
EXPOSE 80

# 启动Nginx服务
CMD ["nginx", "-g", "daemon off;"]
