# Use the SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the csproj and restore dependencies
COPY ["server.csproj", "./"]
RUN dotnet restore "server.csproj"

# Copy the rest of the files and build
COPY . .
RUN dotnet publish "server.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Use the ASP.NET runtime image to run the app
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# Render dynamically assigns a port, but .NET 8 defaults to 8080
ENV ASPNETCORE_HTTP_PORTS=8080
EXPOSE 8080


ENTRYPOINT ["dotnet", "server.dll"]