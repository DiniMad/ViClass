﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ViClass.Models;

namespace ViClass.ModelConfigurations
{
    public class VideoConfiguration:IEntityTypeConfiguration<Video>
    {
        public void Configure(EntityTypeBuilder<Video> builder)
        {
            builder.Property(v => v.Description)
                   .IsRequired();
            builder.Property(v => v.Path)
                   .IsRequired();
            builder.Property(v => v.LengthFormatted)
                   .IsRequired()
                   .HasMaxLength(6);
        }
    }
}