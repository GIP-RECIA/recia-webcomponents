/**
 * Copyright (C) 2023 GIP-RECIA, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export class PaginationNumber {
  pageNumber
  isEllipsisDots
  isPrevious
  isNext
  isLast
  isFirst

  static count: number = 0

  private constructor(
    number: number,
    isEllipsis: boolean,
    isPrevious: boolean,
    isNext: boolean,
    isFirst: boolean,
    isLast: boolean,
  ) {
    this.pageNumber = number
    this.isEllipsisDots = isEllipsis
    this.isPrevious = isPrevious
    this.isNext = isNext
    this.isLast = isLast
    this.isFirst = isFirst
  }

  static getSeparator(): PaginationNumber {
    return new PaginationNumber(-1, true, false, false, false, false)
  }

  static getPaginationNumber(number: number): PaginationNumber {
    return new PaginationNumber(number, false, false, false, false, false)
  }

  static getPrevious(currentPage: number): PaginationNumber {
    return new PaginationNumber(currentPage - 1, false, true, false, false, false)
  }

  static getNext(currentPage: number): PaginationNumber {
    return new PaginationNumber(currentPage + 1, false, false, true, false, false)
  }

  static getFirst(): PaginationNumber {
    return new PaginationNumber(1, false, false, false, true, false)
  }

  static getLast(maxPage: number): PaginationNumber {
    return new PaginationNumber(maxPage, false, false, false, false, true)
  }
}
