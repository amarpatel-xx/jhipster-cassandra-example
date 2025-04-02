package com.saathratri.developer.blog;

import static org.assertj.core.api.Assertions.assertThat;

import com.datastax.oss.driver.api.core.CqlSession;
import com.datastax.oss.driver.api.core.metadata.Metadata;
import com.saathratri.developer.blog.config.CassandraTestContainer;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

@IntegrationTest
public class CassandraKeyspaceIT {

    @Autowired
    private CqlSession session;

    @Test
    void shouldListCassandraTestKeyspace() {
        Metadata metadata = session.getMetadata();
        assertThat(metadata.getKeyspace(CassandraTestContainer.DEFAULT_KEYSPACE_NAME)).isNotNull();
    }
}
