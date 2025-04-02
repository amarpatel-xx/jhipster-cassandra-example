package com.saathratri.developer.blog.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.UUID;
import org.springframework.data.cassandra.core.mapping.CassandraType;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.Table;

/**
 * A SaathratriEntity2.
 */
// Since spring-data-cassandra 3.4.2, table names needs to be in lowercase
// See https://github.com/spring-projects/spring-data-cassandra/issues/1293#issuecomment-1192555467
@Table("saathratri_entity_2")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class SaathratriEntity2 implements Serializable {

    private static final long serialVersionUID = 1L;

    private UUID entityTypeId;

    private Long yearOfDateAdded;

    private Long arrivalDate;

    private UUID blogId;

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

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public UUID getEntityTypeId() {
        return this.entityTypeId;
    }

    public SaathratriEntity2 entityTypeId(UUID entityTypeId) {
        this.setEntityTypeId(entityTypeId);
        return this;
    }

    public void setEntityTypeId(UUID entityTypeId) {
        this.entityTypeId = entityTypeId;
    }

    public Long getYearOfDateAdded() {
        return this.yearOfDateAdded;
    }

    public SaathratriEntity2 yearOfDateAdded(Long yearOfDateAdded) {
        this.setYearOfDateAdded(yearOfDateAdded);
        return this;
    }

    public void setYearOfDateAdded(Long yearOfDateAdded) {
        this.yearOfDateAdded = yearOfDateAdded;
    }

    public Long getArrivalDate() {
        return this.arrivalDate;
    }

    public SaathratriEntity2 arrivalDate(Long arrivalDate) {
        this.setArrivalDate(arrivalDate);
        return this;
    }

    public void setArrivalDate(Long arrivalDate) {
        this.arrivalDate = arrivalDate;
    }

    public UUID getBlogId() {
        return this.blogId;
    }

    public SaathratriEntity2 blogId(UUID blogId) {
        this.setBlogId(blogId);
        return this;
    }

    public void setBlogId(UUID blogId) {
        this.blogId = blogId;
    }

    public String getEntityName() {
        return this.entityName;
    }

    public SaathratriEntity2 entityName(String entityName) {
        this.setEntityName(entityName);
        return this;
    }

    public void setEntityName(String entityName) {
        this.entityName = entityName;
    }

    public String getEntityDescription() {
        return this.entityDescription;
    }

    public SaathratriEntity2 entityDescription(String entityDescription) {
        this.setEntityDescription(entityDescription);
        return this;
    }

    public void setEntityDescription(String entityDescription) {
        this.entityDescription = entityDescription;
    }

    public BigDecimal getEntityCost() {
        return this.entityCost;
    }

    public SaathratriEntity2 entityCost(BigDecimal entityCost) {
        this.setEntityCost(entityCost);
        return this;
    }

    public void setEntityCost(BigDecimal entityCost) {
        this.entityCost = entityCost;
    }

    public Long getDepartureDate() {
        return this.departureDate;
    }

    public SaathratriEntity2 departureDate(Long departureDate) {
        this.setDepartureDate(departureDate);
        return this;
    }

    public void setDepartureDate(Long departureDate) {
        this.departureDate = departureDate;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SaathratriEntity2)) {
            return false;
        }
        return getEntityTypeId() != null && getEntityTypeId().equals(((SaathratriEntity2) o).getEntityTypeId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SaathratriEntity2{" +
            "entityTypeId=" + getEntityTypeId() +
            ", yearOfDateAdded=" + getYearOfDateAdded() +
            ", arrivalDate=" + getArrivalDate() +
            ", blogId='" + getBlogId() + "'" +
            ", entityName='" + getEntityName() + "'" +
            ", entityDescription='" + getEntityDescription() + "'" +
            ", entityCost=" + getEntityCost() +
            ", departureDate=" + getDepartureDate() +
            "}";
    }
}
