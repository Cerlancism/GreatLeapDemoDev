function* generator()
{
    let i = 0;
    yield 0
    yield 1
    yield ""
    while (true)
    {
        yield i++;
    }

}

const data = generator()

for (const iterator of data)
{
    if (iterator > 1000000 && iterator < 1000010)
    {
        console.log(iterator)
    }
    if (iterator > 1000010)
    {
        break;
    }
}