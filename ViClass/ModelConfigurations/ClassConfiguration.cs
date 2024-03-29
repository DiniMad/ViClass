﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ViClass.Models;

namespace ViClass.ModelConfigurations
{
    public class ClassConfiguration : IEntityTypeConfiguration<Class>
    {
        public void Configure(EntityTypeBuilder<Class> builder)
        {
            builder.Property(c => c.Title)
                   .IsRequired()
                   .HasMaxLength(64);
            builder.Property(c => c.Description)
                   .IsRequired()
                   .HasMaxLength(512);
            builder.Property(c => c.StartDateFormatted)
                   .IsRequired()
                   .HasMaxLength(10);
            builder.Property(c => c.EndDateFormatted)
                   .IsRequired()
                   .HasMaxLength(10);
        }
    }
}