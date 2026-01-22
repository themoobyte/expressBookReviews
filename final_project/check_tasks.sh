#!/bin/bash
echo "=== Checking All Tasks ==="
echo

echo "Task 1: Get all books"
echo "Command in file:"
head -1 getallbooks
echo "First few lines of output:"
tail -n +2 getallbooks | head -5
echo

echo "Task 2: Get book by ISBN"
echo "Command:"
head -1 getbookbyisbn
echo "Output:"
tail -n +2 getbookbyisbn
echo

echo "Task 3: Get book by author"
echo "Command:"
head -1 getbookbyauthor
echo "Output:"
tail -n +2 getbookbyauthor
echo

echo "Task 4: Get book by title"
echo "Command:"
head -1 getbookbytitle
echo "Output:"
tail -n +2 getbookbytitle
