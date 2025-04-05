
## JHipster Example for Composite Primary Keys in Cassandra

### About this JHipster Example

This code was generated using the JHipster blueprint `generator-jhipster-cassandra`. 
The source code for the underlying JHipster blueprint is available at: https://github.com/amarpatel-xx/generator-jhipster-cassandra.

The blueprint for generating the composite primary key with Cassandra entities is open source software made with love by `Amar Premsaran Patel`.

This code in this example has a JDL which shows 2 Cassandra entities that have composite primary keys and 3 Cassandra entities that have single-value primary keys. There are also other entities which show composite primary keys using various combinations of partition keys and clustering keys.  The example entities in the JDL is based on

Matt Raible's frequently used the blog and store examples in his capability demonstrations.

The current blueprint now supports a multiple fields of type PrimaryKeyType.PARTITIONED; a field which is the partition column is specified as such with the `@customAnnotation("PrimaryKeyType.PARTITIONED")` custom annotation. If a entity needs to specify additional fields with type `PrimaryKeyType.CLUSTERED`, they are specified using `@customAnnotation("PrimaryKeyType.CLUSTERED")`. The greater than, less than and equal to query methods are autogenerated for the clustering columns. There are no relationships between Cassandra entities, as such relationships cannot be specified. The blueprint also support the Cassandra type `CassandraType.Name.SET` and `CassandraType.Name.MAP`; see below for examples.

Below are various examples of defining JDL entities using the @customAnnotation methodology to specify the details of the Cassandra composite primary key. Also, below is an example of a single-value primary key entity. Some example entities are of composite primary keys using Map fields and some are using a Set field. There are also examples of single-value primary key entities using Maps and Set data structures.
```
    // Composite Primary Key Example:
    entity Post {
      @Id @customAnnotation("PrimaryKeyType.PARTITIONED") @customAnnotation("CassandraType.Name.BIGINT") @customAnnotation("UTC_DATE") @customAnnotation("0") createdDate Long 
      // Do not name composite primary key fields as 'id' as it conflicts with the 'id' field in the JHipster entity.
      @customAnnotation("PrimaryKeyType.CLUSTERED") @customAnnotation("CassandraType.Name.BIGINT") @customAnnotation("UTC_DATETIME") @customAnnotation("1") addedDateTime Long
      @customAnnotation("PrimaryKeyType.CLUSTERED") @customAnnotation("CassandraType.Name.UUID") @customAnnotation("") @customAnnotation("2") postId UUID
      @customAnnotation("") @customAnnotation("CassandraType.Name.TEXT") @customAnnotation("") @customAnnotation("") title String required
      @customAnnotation("") @customAnnotation("CassandraType.Name.TEXT") @customAnnotation("") @customAnnotation("") content String required
      @customAnnotation("") @customAnnotation("CassandraType.Name.BIGINT") @customAnnotation("UTC_DATETIME") @customAnnotation("") publishedDateTime Long
      @customAnnotation("") @customAnnotation("CassandraType.Name.BIGINT") @customAnnotation("UTC_DATE") @customAnnotation("") sentDate Long
    }

    // Single-value Primary Key Example:
    entity Product {
      // Primary Key field can be named 'id'.  JHipster natively supports single-value primary keys.  This blueprint also supports single-value primary keys.
      @Id @customAnnotation("PrimaryKeyType.PARTITIONED") @customAnnotation("CassandraType.Name.UUID") @customAnnotation("") @customAnnotation("") id UUID
      @customAnnotation("") @customAnnotation("CassandraType.Name.TEXT") @customAnnotation("") @customAnnotation("") title String required
      @customAnnotation("") @customAnnotation("CassandraType.Name.DECIMAL") @customAnnotation("") @customAnnotation("") price BigDecimal required min(0)
      @customAnnotation("") @customAnnotation("CassandraType.Name.BLOB") @customAnnotation("image") @customAnnotation("") image ImageBlob
      @customAnnotation("") @customAnnotation("CassandraType.Name.BIGINT") @customAnnotation("UTC_DATE") @customAnnotation("") addedDate Long required
    }

    // Composite Primary Key Example with TIMEUUID clustered key, multiple partitioned keys, with multiple clustered keys.
    entity SaathratriEntity2 {
      @Id @customAnnotation("PrimaryKeyType.PARTITIONED") @customAnnotation("CassandraType.Name.UUID") @customAnnotation("") entityTypeId UUID
      @customAnnotation("PrimaryKeyType.PARTITIONED") @customAnnotation("CassandraType.Name.BIGINT") @customAnnotation("") yearOfDateAdded Long
      @customAnnotation("PrimaryKeyType.CLUSTERED") @customAnnotation("CassandraType.Name.BIGINT") @customAnnotation("UTC_DATE") arrivalDate Long
      @customAnnotation("PrimaryKeyType.CLUSTERED") @customAnnotation("CassandraType.Name.TIMEUUID") @customAnnotation("TIMEUUID") blogId UUID
      @customAnnotation("") @customAnnotation("CassandraType.Name.TEXT") @customAnnotation("") entityName String
      @customAnnotation("") @customAnnotation("CassandraType.Name.TEXT") @customAnnotation("") entityDescription String
      @customAnnotation("") @customAnnotation("CassandraType.Name.DECIMAL") @customAnnotation("") entityCost BigDecimal
      @customAnnotation("") @customAnnotation("CassandraType.Name.BIGINT") @customAnnotation("UTC_DATE") departureDate Long
    }

    // Example showing a text/string set.
    entity SaathratriEntity3 {
      @Id @customAnnotation("PrimaryKeyType.PARTITIONED") @customAnnotation("CassandraType.Name.TEXT") @customAnnotation("") entityType String
      @customAnnotation("PrimaryKeyType.CLUSTERED") @customAnnotation("CassandraType.Name.TIMEUUID") @customAnnotation("") createdTimeId UUID
      @customAnnotation("") @customAnnotation("CassandraType.Name.TEXT") @customAnnotation("") entityName String
      @customAnnotation("") @customAnnotation("CassandraType.Name.TEXT") @customAnnotation("") entityDescription String
      @customAnnotation("") @customAnnotation("CassandraType.Name.DECIMAL") @customAnnotation("") entityCost BigDecimal
      @customAnnotation("") @customAnnotation("CassandraType.Name.BIGINT") @customAnnotation("UTC_DATE") departureDate Long
      @customAnnotation("CassandraType.Name.SET") @customAnnotation("CassandraType.Name.TEXT") @customAnnotation("") tags String,
    }

    // Example showing key-value data structure.
    entity SaathratriEntity4 {
      @Id @customAnnotation("PrimaryKeyType.PARTITIONED") @customAnnotation("CassandraType.Name.UUID") @customAnnotation("") organizationId UUID
      @customAnnotation("PrimaryKeyType.CLUSTERED") @customAnnotation("CassandraType.Name.TEXT") @customAnnotation("") attributeKey String
      @customAnnotation("") @customAnnotation("CassandraType.Name.TEXT") @customAnnotation("") attributeValue String
    }

    // Example showing text/string, boolean, numeric and date-time maps.
    entity AddOnsAvailableByOrganization {
      @Id @customAnnotation("PrimaryKeyType.PARTITIONED") @customAnnotation("CassandraType.Name.UUID") @customAnnotation("") organizationId UUID
      @customAnnotation("PrimaryKeyType.PARTITIONED") @customAnnotation("CassandraType.Name.TEXT") @customAnnotation("") entityType String
      @customAnnotation("PrimaryKeyType.PARTITIONED") @customAnnotation("CassandraType.Name.UUID") @customAnnotation("") entityId UUID
      @customAnnotation("PrimaryKeyType.CLUSTERED") @customAnnotation("CassandraType.Name.UUID") @customAnnotation("") addOnId UUID
      @customAnnotation("") @customAnnotation("CassandraType.Name.TEXT") @customAnnotation("") addOnType String
      @customAnnotation("CassandraType.Name.MAP") @customAnnotation("CassandraType.Name.TEXT") @customAnnotation("") addOnDetailsText String
      @customAnnotation("CassandraType.Name.MAP") @customAnnotation("CassandraType.Name.DECIMAL") @customAnnotation("") addOnDetailsDecimal BigDecimal
      @customAnnotation("CassandraType.Name.MAP") @customAnnotation("CassandraType.Name.BOOLEAN") @customAnnotation("") addOnDetailsBoolean Boolean
      @customAnnotation("CassandraType.Name.MAP") @customAnnotation("CassandraType.Name.BIGINT") @customAnnotation("UTC_DATETIME") addOnDetailsBigInt Long
    }

    // Another example showing text/string, boolean, numeric and date-time maps.
    entity AddOnsSelectedByOrganization {
      @Id @customAnnotation("PrimaryKeyType.PARTITIONED") @customAnnotation("CassandraType.Name.UUID") @customAnnotation("") organizationId UUID
      @customAnnotation("PrimaryKeyType.CLUSTERED") @customAnnotation("CassandraType.Name.BIGINT") @customAnnotation("UTC_DATE") arrivalDate Long
      @customAnnotation("PrimaryKeyType.CLUSTERED") @customAnnotation("CassandraType.Name.TEXT") @customAnnotation("") accountNumber String
      @customAnnotation("PrimaryKeyType.CLUSTERED") @customAnnotation("CassandraType.Name.TIMEUUID") @customAnnotation("") createdTimeId UUID
      @customAnnotation("") @customAnnotation("CassandraType.Name.BIGINT") @customAnnotation("UTC_DATE") departureDate Long
      @customAnnotation("") @customAnnotation("CassandraType.Name.UUID") @customAnnotation("") customerId UUID
      @customAnnotation("") @customAnnotation("CassandraType.Name.TEXT") @customAnnotation("") customerFirstName String
      @customAnnotation("") @customAnnotation("CassandraType.Name.TEXT") @customAnnotation("") customerLastName String
      @customAnnotation("") @customAnnotation("CassandraType.Name.TEXT") @customAnnotation("") customerUpdatedEmail String
      @customAnnotation("") @customAnnotation("CassandraType.Name.TEXT") @customAnnotation("") customerUpdatedPhoneNumber String
      @customAnnotation("") @customAnnotation("CassandraType.Name.TEXT") @customAnnotation("") customerEstimatedArrivalTime String
      @customAnnotation("") @customAnnotation("CassandraType.Name.TEXT") @customAnnotation("") tinyUrlShortCode String
      @customAnnotation("CassandraType.Name.MAP") @customAnnotation("CassandraType.Name.TEXT") @customAnnotation("") addOnDetailsText String
      @customAnnotation("CassandraType.Name.MAP") @customAnnotation("CassandraType.Name.DECIMAL") @customAnnotation("") addOnDetailsDecimal BigDecimal
      @customAnnotation("CassandraType.Name.MAP") @customAnnotation("CassandraType.Name.BOOLEAN") @customAnnotation("") addOnDetailsBoolean Boolean
      @customAnnotation("CassandraType.Name.MAP") @customAnnotation("CassandraType.Name.BIGINT") @customAnnotation("UTC_DATETIME") addOnDetailsBigInt Long
    }

    // Single-value Primary Key with Maps
    entity LandingPageByOrganization {
      @Id @customAnnotation("PrimaryKeyType.PARTITIONED") @customAnnotation("CassandraType.Name.UUID") @customAnnotation("") organizationId UUID
      @customAnnotation("CassandraType.Name.MAP") @customAnnotation("CassandraType.Name.TEXT") @customAnnotation("") detailsText String
      @customAnnotation("CassandraType.Name.MAP") @customAnnotation("CassandraType.Name.DECIMAL") @customAnnotation("") detailsDecimal BigDecimal
      @customAnnotation("CassandraType.Name.MAP") @customAnnotation("CassandraType.Name.BOOLEAN") @customAnnotation("") detailsBoolean Boolean
      @customAnnotation("CassandraType.Name.MAP") @customAnnotation("CassandraType.Name.BIGINT") @customAnnotation("UTC_DATETIME") detailsBigInt Long
    }

    // Single-value Primary Key with Set
    entity SetEntityByOrganization {
      @Id @customAnnotation("PrimaryKeyType.PARTITIONED") @customAnnotation("CassandraType.Name.UUID") @customAnnotation("") organizationId UUID
      @customAnnotation("CassandraType.Name.SET") @customAnnotation("CassandraType.Name.TEXT") @customAnnotation("") tags String
    }
```

## Prerequisites:

- [Java](https://sdkman.io/) 21+
- [Node.js](https://nodejs.org/) 20+
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [JHipster](https://www.jhipster.tech/installation/) 8.6.0

### Build

Build Java Microservices using the Cassandra Composite Primary Key Blueprint

### Build Java Microservices using the Cassandra Composite Primary Key Blueprint

1. To generate a microservices architecture with Cassandra composite primary key support, run the following command:
```console
npm install -g generator-jhipster-cassandra

git clone https://github.com/amarpatel-xx/jhipster-cassandra-example.git

cd jhipster-cassandra-example

sh saathratri-generate-code-dev-cassandra.sh
```

 2. You should see the message:
```console
Congratulations, JHipster execution is complete!
```

### Run your Cassandra Composite Primary Key Entities Example

1.  When the process is complete, cd into the `gateway` directory and start Keycloak and Eureka using Docker Compose.
```console
cd gateway
docker compose -f src/main/docker/keycloak.yml up -d
docker compose -f src/main/docker/jhipster-registry.yml up -d
```
Please make sure the jhipster-registry-1 Docker Container is started; sometimes that container does not run after the above command and needs to be started manually in Docker Desktop.  The jhipster-registry-1 container should appear under the gateway application within Docker Desktop.

2.  Start `gateway` database with Docker by opening a terminal and navigating to its directory and running the Docker command. Then start the `gateway` by running the Maven command.
```console
npm run docker:db:up
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

3.  Start `blog` database with Docker by opening a terminal and navigating to its directory and running the Docker command. Then, start the `blog` microservice.
```console
cd blog
npm run docker:db:up
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

4.  Start `store` database with Docker by opening a terminal and navigating to its directory and running the Docker command. Then, start the `store` microservice.
```console
cd store
npm run docker:db:up
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

### Switch Identity Providers

JHipster ships with Keycloak when you choose OAuth 2.0 / OIDC as the authentication type.

If you'd like to use Okta for your identity provider, see [JHipster's documentation](https://www.jhipster.tech/security/#okta).

#### You can configure JHipster quickly with the [Okta CLI](https://cli.okta.com):
```console
okta apps create jhipster
```

### See the Code in Action

Now you can open your favorite browser to [http://localhost:8080](http://localhost:8080), and log in with the credentials displayed on the page.

## Then create some entities:
1.  Open your favorite browser to [http://localhost:8080](http://localhost:8080), and log in with the credentials displayed on the page.
2.  Add a user by providing a ID (UUID) and a login name (string).
3.  Then, add a blog by giving it a category (string), blog ID (UUID), handle (string) and content (string).
4.  Add a tag by giving it a ID (UUID) and name (string).
5.  Create a post by giving it a created date, added date time, post ID (UUID), title (string), content (string), published date time, and sent date.
6.  Finally, create a product by giving it an ID (UUID), title (string), price (number with decimal), image (choose an image file), and added date.


Notice the Blog and Post entities show the required composite primary key fields during the create, update and delete process. That is success!

## Have Fun with Micro Frontends and JHipster!

I hope you enjoyed this demo, and it helped you understand how to build better microservice architectures with composite primary keys.

☕️ Find the code for the underlying blueprint for this example on GitHub: https://github.com/amarpatel-xx/generator-jhipster-cassandra

☕️ Find the example code that uses the blueprint to generate a JHipster application on GitHub: https://github.com/amarpatel-xx/jhipster-cassandra-example

🤓 Read the following blog post, by Matt Raible, that was used as inspiration for this project: [Micro Frontends for Java Microservices](https://auth0.com/blog/micro-frontends-for-java-microservices/)

### Acknowledgements

Thank you to [yelhouti](https://github.com/yelhouti), [Jeremy Artero](https://www.linkedin.com/in/jeremyartero/), [Matt Raible](https://github.com/mraible), [Gaël Marziou](https://github.com/gmarziou), [Cedrick Lunven](https://www.linkedin.com/in/clunven/), [Christophe Borne](https://www.linkedin.com/in/christophe-bornet-bab1193/ ), [Disha Patel](https://www.linkedin.com/in/dishapatel860/) and [Catherine Guevara](https://www.linkedin.com/in/catherine-guevara-1a5375b1/) for your invaluable contributions to this example and the underlying JHipster blueprint.
