package com.saathratri.developer.blog.domain;

import java.util.Objects;
import java.util.UUID;
import org.springframework.data.cassandra.core.cql.PrimaryKeyType;
import org.springframework.data.cassandra.core.mapping.CassandraType;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyClass;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyColumn;

@PrimaryKeyClass
public class SaathratriEntity5Id implements java.io.Serializable {

    @PrimaryKeyColumn(name = "organization_id", ordinal = 0, type = PrimaryKeyType.PARTITIONED)
    @CassandraType(type = CassandraType.Name.UUID)
    private UUID organizationId;

    @PrimaryKeyColumn(name = "entity_type", ordinal = 1, type = PrimaryKeyType.PARTITIONED)
    @CassandraType(type = CassandraType.Name.TEXT)
    private String entityType;

    @PrimaryKeyColumn(name = "entity_id", ordinal = 2, type = PrimaryKeyType.PARTITIONED)
    @CassandraType(type = CassandraType.Name.UUID)
    private UUID entityId;

    @PrimaryKeyColumn(name = "add_on_id", ordinal = 3, type = PrimaryKeyType.CLUSTERED)
    @CassandraType(type = CassandraType.Name.UUID)
    private UUID addOnId;

    public SaathratriEntity5Id() {}

    public SaathratriEntity5Id(UUID organizationId, String entityType, UUID entityId, UUID addOnId) {
        this.organizationId = organizationId;
        this.entityType = entityType;
        this.entityId = entityId;
        this.addOnId = addOnId;
    }

    public UUID getOrganizationId() {
        return this.organizationId;
    }

    public void setOrganizationId(UUID organizationId) {
        this.organizationId = organizationId;
    }

    public SaathratriEntity5Id organizationId(UUID organizationId) {
        this.organizationId = organizationId;
        return this;
    }

    public String getEntityType() {
        return this.entityType;
    }

    public void setEntityType(String entityType) {
        this.entityType = entityType;
    }

    public SaathratriEntity5Id entityType(String entityType) {
        this.entityType = entityType;
        return this;
    }

    public UUID getEntityId() {
        return this.entityId;
    }

    public void setEntityId(UUID entityId) {
        this.entityId = entityId;
    }

    public SaathratriEntity5Id entityId(UUID entityId) {
        this.entityId = entityId;
        return this;
    }

    public UUID getAddOnId() {
        return this.addOnId;
    }

    public void setAddOnId(UUID addOnId) {
        this.addOnId = addOnId;
    }

    public SaathratriEntity5Id addOnId(UUID addOnId) {
        this.addOnId = addOnId;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SaathratriEntity5Id)) {
            return false;
        }

        SaathratriEntity5Id saathratriEntity5Id = (SaathratriEntity5Id) o;
        return (
            Objects.equals(organizationId, saathratriEntity5Id.organizationId) &&
            Objects.equals(entityType, saathratriEntity5Id.entityType) &&
            Objects.equals(entityId, saathratriEntity5Id.entityId) &&
            Objects.equals(addOnId, saathratriEntity5Id.addOnId)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(organizationId, entityType, entityId, addOnId);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SaathratriEntity5Id { " +
                "organizationId='" + getOrganizationId() + "'" +
                ",entityType='" + getEntityType() + "'" +
                ",entityId='" + getEntityId() + "'" +
                ",addOnId='" + getAddOnId() + "'" +
                " }";
    }
}
