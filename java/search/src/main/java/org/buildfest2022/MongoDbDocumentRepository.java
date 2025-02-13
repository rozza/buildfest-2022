package org.buildfest2022;

import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoCollection;
import io.micronaut.core.annotation.NonNull;
import jakarta.inject.Singleton;
import org.reactivestreams.Publisher;
import reactor.core.publisher.Mono;

@Singleton
public class MongoDbDocumentRepository implements DocumentRepository {

  private final MongoDbConfiguration mongoConf;

  private final MongoClient mongoClient;

  public MongoDbDocumentRepository(MongoDbConfiguration mongoConf, MongoClient mongoClient) {
    this.mongoConf = mongoConf;
    this.mongoClient = mongoClient;
  }

  @Override
  public Publisher<Document> list() {
    return getCollection().find();
  }

  @Override
  public Mono<Boolean> save(Document document) {
    return Mono.from(getCollection().insertOne(document))
        .map(insertOneResult -> true)
        .onErrorReturn(false);
  }

  @NonNull
  private MongoCollection<Document> getCollection() {
    return mongoClient
        .getDatabase(mongoConf.getName())
        .getCollection(mongoConf.getCollection(), Document.class);
  }
}
