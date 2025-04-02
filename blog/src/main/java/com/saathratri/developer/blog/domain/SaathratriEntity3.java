package com.saathratri.developer.blog.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Set;
import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.CassandraType;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.Table;

/**
 * A SaathratriEntity3.
 */
// Since spring-data-cassandra 3.4.2, table names needs to be in lowercase
// See https://github.com/spring-projects/spring-data-cassandra/issues/1293#issuecomment-1192555467
@Table("saathratri_entity_3")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class SaathratriEntity3 implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private SaathratriEntity3Id compositeId;

    @Column("entity_name")
    @CassandraType(type = CassandraType.Name.TEXT)
    private String entityName;

    @Column("entity_description")
    @CassandraType(type = CassandraType.Name.TEXT)
    private String entityDescription;

    @Column("entity_cost")
    @CassandraType(type = CassandraType.Name.DECIMAL)
    private BigDecimal entityCost;

    @Column("departure_date")
    @CassandraType(type = CassandraType.Name.BIGINT)
    private Long departureDate;

    @Column("tags")
    @CassandraType(type = CassandraType.Name.SET, typeArguments = CassandraType.Name.TEXT)
    private Set<String> tags;

    public SaathratriEntity3Id getCompositeId() {
        return this.compositeId;
    }

    public void setCompositeId(SaathratriEntity3Id compositeId) {
        this.compositeId = compositeId;
    }

    public SaathratriEntity3 compositeId(SaathratriEntity3Id compositeId) {
        this.compositeId = compositeId;
        return this;
    }

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getEntityName() {
        return this.entityName;
    }

    public SaathratriEntity3 entityName(String entityName) {
        this.setEntityName(entityName);
        return this;
    }

    public void setEntityName(String entityName) {
        this.entityName = entityName;
    }

    public String getEntityDescription() {
        return this.entityDescription;
    }

    public SaathratriEntity3 entityDescription(String entityDescription) {
        this.setEntityDescription(entityDescription);
        return this;
    }

    public void setEntityDescription(String entityDescription) {
        this.entityDescription = entityDescription;
    }

    public BigDecimal getEntityCost() {
        return this.entityCost;
    }

    public SaathratriEntity3 entityCost(BigDecimal entityCost) {
        this.setEntityCost(entityCost);
        return this;
    }

    public void setEntityCost(BigDecimal entityCost) {
        this.entityCost = entityCost;
    }

    public Long getDepartureDate() {
        return this.departureDate;
    }

    public SaathratriEntity3 departureDate(Long departureDate) {
        this.setDepartureDate(departureDate);
        return this;
    }

    public void setDepartureDate(Long departureDate) {
        this.departureDate = departureDate;
    }

    public Set<String> getTags() {
        return this.tags;
    }

    public SaathratriEntity3 tags(Set<String> tags) {
        this.setTags(tags);
        return this;
    }

    public void setTags(Set<String> tags) {
        this.tags = tags;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SaathratriEntity3)) {
            return false;
        }
        return getCompositeId() != null && getCompositeId().equals(((SaathratriEntity3) o).getCompositeId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SaathratriEntity3{" +
            "compositeId=" + getCompositeId() +
            ", entityName='" + getEntityName() + "'" +
            ", entityDescription='" + getEntityDescription() + "'" +
            ", entityCost=" + getEntityCost() +
            ", departureDate=" + getDepartureDate() +
            ", tags='" + getTags() + "'" +
            "}";
    }
}
