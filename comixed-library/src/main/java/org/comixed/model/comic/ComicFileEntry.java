/*
 * ComiXed - A digital comic book library management application.
 * Copyright (C) 2020, The ComiXed Project
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses>
 */

package org.comixed.model.comic;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;
import javax.persistence.*;
import org.comixed.views.View;

@Entity
@Table(name = "comic_file_entries")
public class ComicFileEntry {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "comic_id")
  private Comic comic;

  @Column(name = "file_number", nullable = false, updatable = true)
  @JsonProperty("fileNumber")
  @JsonView({
    View.ComicDetails.class,
  })
  private Integer fileNumber;

  @Column(name = "file_name", nullable = false, length = 1024)
  @JsonProperty("fileName")
  @JsonView({
    View.ComicDetails.class,
  })
  private String fileName;

  @Column(name = "file_size", nullable = false)
  @JsonProperty("fileSize")
  @JsonView({
    View.ComicDetails.class,
  })
  private Integer fileSize;

  @Column(name = "file_type", nullable = false, length = 256)
  @JsonProperty("fileType")
  @JsonView({
    View.ComicDetails.class,
  })
  private String fileType;

  public ComicFileEntry() {}

  public Long getId() {
    return id;
  }

  public Comic getComic() {
    return comic;
  }

  public void setComic(Comic comic) {
    this.comic = comic;
  }

  public Integer getFileNumber() {
    return fileNumber;
  }

  public void setFileNumber(Integer fileNumber) {
    this.fileNumber = fileNumber;
  }

  public String getFileName() {
    return fileName;
  }

  public void setFileName(String fileName) {
    this.fileName = fileName;
  }

  public Integer getFileSize() {
    return fileSize;
  }

  public void setFileSize(Integer fileSize) {
    this.fileSize = fileSize;
  }

  public String getFileType() {
    return fileType;
  }

  public void setFileType(String fileType) {
    this.fileType = fileType;
  }
}
